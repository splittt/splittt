import InputActivity from './activities/InputActivity'
import { Form } from 'semantic-ui-react'
import CanvasActivity from './activities/CanvasActivity'
import MapActivity from './activities/MapActivity'
export const activityNames = {
    'inputActivity': "Text amb resposta correcta",
    'canvasActivity': "Pintar",
    'mapActivity': "Mapa"
}
export const activityComponents = {
    'inputActivity': InputActivity,
    'canvasActivity': CanvasActivity,
    'mapActivity': MapActivity
}
// 'correctAnswer': {'element':Form.Input, 'label': 'Resposta correcta'}
export const activityExtraFields = {
    'inputActivity': {
    },
    'canvasActivity':{},
    'mapActivity':{}

}