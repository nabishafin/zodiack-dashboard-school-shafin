import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"; // ✅ added

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // ✅ added

  const handleSubmit = (e) => {
    e.preventDefault(); // form reload bondho korar jonno

    // 👉 ekhane tumi chaile real authentication check korte paro

    // success hole dashboard e pathai:
    navigate("/dashboard"); // ✅ dashboard route
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 ">
      <div className="w-full max-w-5xl flex items-center justify-center gap-20">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center justify-center flex-1  pr-5 ">
          <img src={logo} alt="" />
        </div>

        {/* Sign In Form */}
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Sign In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {" "}
                {/* ✅ added */}
                {/* Username/Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="username">User name</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="h-11 border-gray-300"
                  />
                </div>
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 pr-10 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                    />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <Link to={"/forgotpass"}>
                    <button
                      type="button"
                      className="text-sm text-[#2C6E3E] hover:text-[#2C6E3E] font-medium"
                    >
                      Forgot password?
                    </button>
                  </Link>
                </div>
                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#2C6E3E] text-white font-medium"
                >
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
