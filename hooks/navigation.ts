import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types/navigation";

function getNavigation(){
    const navigation = useNavigation<NavigationProps>()
    return navigation;
}
export default getNavigation;