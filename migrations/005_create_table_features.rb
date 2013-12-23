Sequel.migration do
  up do
    create_table :features do

      primary_key :id

      String      :name,
        null:      false

      Integer     :version,
        null:      false,
        default:   1

      String      :ref,
        null:      false

      Integer     :start,
        null:      false

      Integer     :end,
        null:      false

      column      :subfeatures, :json,
        default:   Sequel.pg_json({})

      column      :tracks, 'text[]',
        default:   Sequel.pg_array([
          'DNA', 'Edit', 'maker', 'augustus_masked',
          'snap_masked', 'est2genome', 'protein2genome',
          'blastx', 'tblastx', 'blastn', 'repeatmasker'
        ])
    end
  end

  down do
    drop_constraint_validations_for table: :features
    drop_table :features
  end
end
