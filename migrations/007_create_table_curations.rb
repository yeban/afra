Sequel.migration do
  up do
    create_table :curations  do

      foreign_key :id, :tasks,
        primary_key: true,
        on_delete:   :cascade
    end
  end

  down do
    drop_constraint_validations_for table: :curations
    drop_table :curations
  end
end
