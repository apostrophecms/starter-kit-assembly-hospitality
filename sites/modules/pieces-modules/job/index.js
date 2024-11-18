module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Job',
    pluralLabel: 'Jobs',
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Job Title',
        required: true
      },
      department: {
        type: 'string',
        label: 'Department',
      },
      location: {
        type: 'string',
        label: 'Location',
      },
      jobType: {
        type: 'select',
        label: 'Job Type',
        choices: [
          { label: 'Full-Time', value: 'full-time' },
          { label: 'Part-Time', value: 'part-time' },
          { label: 'Temporary', value: 'temporary' },
          { label: 'Contract', value: 'contract' }
        ],
      },
      salaryRange: {
        type: 'object',
        label: 'Salary Range',
        fields: {
          add: {
            min: {
              type: 'float',
              label: 'Minimum Salary',
            },
            max: {
              type: 'float',
              label: 'Maximum Salary',
            }
          }
        }
      },
      description: {
        type: 'string',
        label: 'Job Description',
        textarea: true,
      },
      requirements: {
        type: 'array',
        label: 'Job Requirements',
        fields: {
          add: {
            requirement: {
              type: 'string',
              label: 'Requirement',
            }  
          }
        }
      },
      applicationDeadline: {
        type: 'date',
        label: 'Application Deadline',
      },
      applicationLink: {
        type: 'url',
        label: 'Application Link',
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'department', 'location', 'jobType', 'salaryRange']
      },
      details: {
        label: 'Details',
        fields: ['description', 'requirements', 'applicationDeadline', 'applicationLink']
      }
    }
  }
};