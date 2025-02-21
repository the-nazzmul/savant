import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
