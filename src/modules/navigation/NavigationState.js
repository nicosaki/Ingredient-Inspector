import {fromJS} from 'immutable';

import {NavigationExperimental} from 'react-native';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const SWITCH_TAB = 'NavigationState/SWITCH_TAB';

export function switchTab(index) {
  return {
    type: SWITCH_TAB,
    payload: index
  };
}

// Action creators
export function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: route
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

// reducers for tabs and scenes are separate
const initialState = fromJS({
  tabs: {
    index: 0,
    routes: [
      {key: 'Home', title: 'YOUR LISTS'},
      {key: 'Ingredients', title: 'Check Ingredients'}
    ]
  },
  // Scenes for the `HomeTab` tab.
  Home: {
    index: 0,
    routes: [{key: 'Home', title: 'YOUR LISTS'}]
  },

  Approved: {
    index: 1,
    routes: [{key: 'Approved', title: 'Approved'}]
  },

  Avoid: {
    index: 1,
    routes: [{key: 'Avoid', title: 'Avoid'}]
  },

  Concerns: {
    index: 1,
    routes: [{key: 'Concerns', title: 'High-Concern Ingredients'}]
  },

  About: {
    index: 1,
    routes: [{key: 'About', title: 'About IngredientInspector'}]
  },

  Scanner: {
    index: 1,
    routes: [{key: 'Scanner', title: 'SCAN A BARCODE'}]
  },

  Ingredients: {
    index: 0,
    routes: [{key: 'Ingredients', title: "Check Ingredients"}]
  }

});

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE: {
      // Push a route into the scenes stack.
      const route = action.payload;
      const tabs = state.get('tabs');
      const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
      const scenes = state.get(tabKey).toJS();
      let nextScenes;
      // fixes issue #52
      // the try/catch block prevents throwing an error when the route's key pushed
      // was already present. This happens when the same route is pushed more than once.
      try {
        nextScenes = NavigationStateUtils.push(scenes, route);
      } catch (e) {
        nextScenes = scenes;
      }
      if (scenes !== nextScenes) {
        return state.set(tabKey, fromJS(nextScenes));
      }
      return state;
    }

    case POP_ROUTE: {
      // Pops a route from the scenes stack.
      const tabs = state.get('tabs');
      const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
      const scenes = state.get(tabKey).toJS();
      const nextScenes = NavigationStateUtils.pop(scenes);
      if (scenes !== nextScenes) {
        return state.set(tabKey, fromJS(nextScenes));
      }
      return state;
    }

    case SWITCH_TAB: {
      // Switches the tab.
      const tabs = state.get('tabs').toJS();
      const nextTabs = NavigationStateUtils.jumpToIndex(tabs, action.payload);
       if (tabs !== nextTabs) {
        return state.set('tabs', fromJS(nextTabs));
      }
      return state;
    }

    default:
      return state;
  }
}
