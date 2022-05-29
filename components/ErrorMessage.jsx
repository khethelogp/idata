import { Text } from "react-native";
import tw from "twrnc";

const ErrorMessage = ({ error }) => {
  return (
    <Text style={tw`items-start text-red-500 text-xs italic`}>{error}</Text>
  );
};

export default ErrorMessage;
