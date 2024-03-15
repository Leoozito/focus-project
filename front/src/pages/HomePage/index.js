import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

const HomePage = () => {
    return(
        <>
            <Navbar/>
            <Button href="/users/sign-in" name="Login"/>
            <Button href="/users/sign-up" name="Logout"/>
        </>
    )
}

export default HomePage;