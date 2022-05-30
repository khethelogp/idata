import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { COLORS } from "../../constants";
import { PrimaryBTN, ErrorMessage } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(false);

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match")
      .required("Required"),
  });

  const handleSubmit = (values, props) => {
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2500);

    console.log("####");
    console.log(values);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={[tw`flex justify-center p-5`, styles.box]}>
        <Text style={[tw`text-white text-2xl`, styles.welcomeText]}>
          {isLogin ? "Welcome \nBack" : "Create \nAccount"}
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <View style={[tw`p-2 flex`]}>
            {!isLogin && (
              <>
                <TextInput
                  onChangeText={props.handleChange("userName")}
                  onBlur={props.handleBlur("userName")}
                  value={props.values.userName}
                  placeholder="Username"
                  style={[
                    tw`border border-gray-400 rounded w-full py-3 px-3 my-2`,
                  ]}
                />
                {props.errors.userName && props.touched.userName && (
                  <ErrorMessage error={props.errors.userName} />
                )}
              </>
            )}
            <TextInput
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              placeholder="Email"
              style={[tw`border border-gray-400 rounded w-full py-3 px-3 my-2`]}
            />
            {props.errors.email && props.touched.email && (
              <ErrorMessage error={props.errors.email} />
            )}
            <TextInput
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              placeholder="Password"
              secureTextEntry
              style={[tw`border border-gray-400 rounded w-full py-3 px-3 my-2`]}
            />
            {props.errors.password && props.touched.password && (
              <ErrorMessage error={props.errors.password} />
            )}
            {!isLogin && (
              <>
                <TextInput
                  onChangeText={props.handleChange("confirmPassword")}
                  onBlur={props.handleBlur("confirmPassword")}
                  value={props.values.confirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry
                  style={[
                    tw`border border-gray-400 rounded w-full py-3 px-3 my-2`,
                  ]}
                />
                {props.errors.confirmPassword &&
                  props.touched.confirmPassword && (
                    <ErrorMessage error={props.errors.confirmPassword} />
                  )}
              </>
            )}
            <View style={[tw`flex items-center`]}>
              <PrimaryBTN
                style={[tw`my-4`]}
                title={isLogin ? "Login" : "Sign Up"}
                handlePress={props.handleSubmit}
              />
            </View>
            <View style={tw`my-2 flex flex-row justify-evenly`}>
              <Text style={tw`text-lg`}>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsLogin(!isLogin);
                }}
              >
                <Text style={[tw`text-lg font-bold`, styles.loginBTN]}>
                  {isLogin ? "SignUp" : "Login"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.primary,
    width: 390,
    height: 250,
  },
  welcomeText: {
    fontSize: 32,
  },
  loginBTN: {
    color: COLORS.secondary,
  },
});

export default AuthScreen;
