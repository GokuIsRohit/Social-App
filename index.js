/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Route from './Src/Navigation/Route';
import Test from './Src/Views/MainScreen/Test';
import MultiSelectCalender from './Src/Views/MainScreen/MultiSelectCalender';
import FormView from './Src/Views/MainScreen/FormView';
import CheckForm from './Src/Views/MainScreen/CheckForm';
import Widgets from './Src/Views/MainScreen/Widgets';


AppRegistry.registerComponent(appName, () => Route);
