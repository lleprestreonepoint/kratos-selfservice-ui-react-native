import "react-native-gesture-handler"

import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Recovery from './Routes/Recovery'

import Login from "./Routes/Login"
import Registration from "./Routes/Registration"
import Home from "./Routes/Home"
import { AuthContext } from "./AuthProvider"
import Settings from "./Routes/Settings"
import FlashMessage from "react-native-flash-message"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native"
import Header from "./Layout/Header"

const Stack = createStackNavigator<RootStackParamList>()

export type RootStackParamList = {
  Home: undefined
  Login: {
    refresh?: boolean
    aal?: "aal2"
  }
  Registration: undefined
  Settings: {
    flowId?: string,
  }
  Recovery: undefined
}

const options = {
  header: () => <Header />,
}

const linking = {
  // This is only used for e2e testing.
  prefixes: ["http://127.0.0.1:4457/"],
}

export default () => {
  // import { AuthContext } from './AuthProvider'
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={{height:"100%", width: "100%"}} onPress={Keyboard.dismiss}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            screenOptions={{
              headerShown: isAuthenticated,
            }}
          >
            <Stack.Screen name="Home" component={Home} options={options} />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={options}
            />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Login" component={Login} initialParams={{}} />
            <Stack.Screen name="Recovery" component={Recovery} />
          </Stack.Navigator>
        </NavigationContainer>
      </TouchableOpacity>
      <View data-testid={"flash-message"}>
        <FlashMessage position="top" floating />
      </View>
    </KeyboardAvoidingView>
  )
}
