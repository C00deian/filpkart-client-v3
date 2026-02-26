import { useRegisterForm } from "./hooks/useRegisterForm";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routePaths";

const RegisterPage = () => {
  const { form, onSubmit, isLoading } = useRegisterForm();
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
            <h2 className="text-white text-3xl font-bold mb-4">
              Create Account
            </h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed">
              Join millions of shoppers and get the best deals every day
            </p>
          </div>

          <div className="z-10 flex justify-center mt-auto">
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <span className="text-7xl">🛍️</span>{" "}
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
              id="phoneNumber"
              label="Mobile number"
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
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
              Create Account
            </Button>

            {/* Social Regisrer*/}
    
          </form>
          <div className="mt-8 text-center pt-4 border-t border-slate-100">
            <Link
              to={ROUTES.LOGIN}
              className="text-primary text-sm font-semibold hover:underline"
            >
              Existing user? Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
