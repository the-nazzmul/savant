import { SignIn } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      <SignIn />
    </div>
  );
};

export default SignUpPage;
