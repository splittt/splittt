import InputActivity from './activities/InputActivity'
import { Form } from 'semantic-ui-react'
import CanvasActivity from './activities/CanvasActivity'
export const activityNames = {
    'inputActivity': "Text amb resposta correcta",
    'canvasActivity': "Pintar"
}
export const activityComponents = {
    'inputActivity': InputActivity,
    'canvasActivity': CanvasActivity
}

export const activityExtraFields = {
    'inputActivity': {
        'correctAnswer': {'element':Form.Input, 'label': 'Resposta correcta'}
    },
    'canvasActivity':{}

}