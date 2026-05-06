import Button from "../component/common/Button";
import HomeHeader from "../component/Home/HomeHeader";

const ModalPage = () => {
  return (
    <div className="bg-pink p-6 border border-pink-2 rounded-lg">
      <HomeHeader />
      <Button children="test" variant="blue" />
      <Button children="test" variant="white" />
    </div>
  );
};

export default ModalPage;
