import { auth } from "../../firebase/base";
import { signOut } from "firebase/auth";
const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="sign-out" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
