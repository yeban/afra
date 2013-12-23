class Task < Sequel::Model

  many_to_one   :feature

  plugin        :class_table_inheritance,
    key:         :type

  class << self
    def give(to: nil)
      raise "Task can only be given 'to' a User" unless to.is_a? User
      task = where(id: to.tasks.map(&:id)).invert.
        where(state: 'ready').order(Sequel.desc :priority).first
      task.set_running_state
    end
  end

  def register_submission(submission, from: nil)
    yield
    register_user_contribution from
    increment_priority and set_ready_state and save
  end

  #private

  def set_ready_state
    self.state = 'ready'
    self
  end

  def set_running_state
    self.state = 'running'
    self
  end

  def increment_priority
    self.priority += 1
    self
  end

  def register_user_contribution(from)
    raise "Submission should come 'from' a User" unless from.is_a? User
    Contribution.create user_id: from.id, task_id: id
  end
end

class Curation < Task

  def register_submission(submission, from: nil)
    super do
      # The id of the submissions can be ignored. And assuming the submission
      # comprises only one gene model.
      submission = submission.values.first

      feature = Feature.new name: submission[5], ref: submission[12], start: submission[1], end: submission[2]
      feature.subfeatures = submission.find{|i| i.is_a? Array}.map do |data|
        {start: data[1], end: data[2]}
      end
      feature.save
    end
  end
end
