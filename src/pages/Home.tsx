import Button from "../component/common/Button";
import HomeHeader from "../component/Home/HomeHeader";


const Home = () => {
    return(
    <div className="flex flex-1 w-full">
        <HomeHeader />
        <Button children="test" variant="blue"/> 
        <Button children="test" variant="white" />
    </div>);
}

export default Home;