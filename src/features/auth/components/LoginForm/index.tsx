import { useLoginForm } from "./hooks/useLoginForm";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routePaths";

const LoginForm = () => {
  const { form, onSubmit, isLoading } = useLoginForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-bg-main px-4 py-10">
      <div className="w-full max-w-[850px] overflow-hidden rounded shadow-xl flex min-h-[490px] bg-white">
        {/* Left: Branding */}
        <div className="relative hidden w-[38%] flex-col justify-between bg-primary p-10 md:flex">
          <div className="z-10">
            <h2 className="text-white text-3xl font-bold mb-4">Login</h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>

          <div className="z-10 flex justify-center mt-auto">
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <span className="text-7xl">🛍️</span>
            </div>
          </div>

          {/* Decorative blobs */}
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-blue-500/30 rounded-full blur-xl" />
          <div className="absolute top-10 -right-5 w-24 h-24 bg-blue-400/20 rounded-full blur-xl" />
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex flex-col justify-between p-8 md:p-10">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <Input
              id="identifier"
              label="Enter Email / Mobile number"
              {...register("identifier")}
              error={errors.identifier?.message}
              disabled={isLoading}
            />
            <p className="text-xs text-slate-500">
              By continuing, you agree to Flipkart's{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <Button type="submit" isLoading={isLoading} fullWidth>
              Continue
            </Button>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-slate-200" />
              <span className="mx-4 flex-shrink-0 text-sm text-slate-400">
                OR
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-full h-11 border border-slate-200 rounded bg-white hover:bg-slate-50 transition flex items-center justify-center gap-3 text-sm text-slate-600 font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23.766 12.276C23.766 11.461 23.7 10.641 23.559 9.838H12.24V14.459H18.722C18.453 15.949 17.589 17.268 16.323 18.106V21.104H20.19C22.461 19.014 23.766 15.927 23.766 12.276Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.24 24C15.477 24 18.206 22.938 20.195 21.104L16.328 18.106C15.252 18.838 13.863 19.252 12.245 19.252C9.113 19.252 6.459 17.14 5.507 14.3H1.516V17.391C3.553 21.443 7.703 24 12.24 24Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.503 14.3C5.003 12.81 5.003 11.196 5.503 9.706V6.615H1.517C-0.186 10.006 -0.186 14 1.517 17.391L5.503 14.3Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.24 4.75C13.951 4.723 15.604 5.367 16.843 6.549L20.269 3.123C18.1 1.086 15.221 -0.034 12.24 0.001C7.703 0.001 3.553 2.558 1.516 6.615L5.502 9.706C6.45 6.862 9.109 4.75 12.24 4.75Z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pt-4 border-t border-slate-100">
            <Link
              to={ROUTES.REGISTER}
              className="text-primary text-sm font-semibold hover:underline"
            >
              New to Flipkart? Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
