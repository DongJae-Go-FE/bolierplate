import LoginForm from "./components/login-form";

export default function Page() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gray-100">
      <LoginForm />
      <p className="body03M absolute bottom-10 text-center text-gray-500">
        Copyright © HDC Labs Corp. All rights reserved.
      </p>
    </div>
  );
}
