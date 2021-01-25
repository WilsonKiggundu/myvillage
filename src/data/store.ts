import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga"
import {loadUser} from "redux-oidc";
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import userManager from "../utils/userManager";
import {rootReducer} from "./rootReducer";
import rootSaga from "./rootSaga";

const middlewares = [];
const myWindow = window as any;
const toolsName = '__REDUX_DEVTOOLS_EXTENSION__';
const devTools: any = myWindow[toolsName] ? myWindow[toolsName]() : (f: any) => f;

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({collapsed: true});
    middlewares.push(logger)
}

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware)
// middlewares.push(thunk)

const middleware = applyMiddleware(createLogger({
    predicate: ((getState, action) => false)
}), ...middlewares);

const store: any = middleware(devTools(createStore))(rootReducer)

sagaMiddleware.run(rootSaga)
loadUser(store, userManager).then((user) => {

})

export default store



