import InputActivity from './activities/InputActivity'
import { Form } from 'semantic-ui-react'
export const activityNames = {
    'inputActivity': "Text amb resposta correcta"
}
export const activityComponents = {
    'inputActivity': InputActivity
}

export const activityExtraFields = {
    'inputActivity': {
        'correctAnswer': {'element':Form.Input, 'label': 'Resposta correcta'}
    }
}