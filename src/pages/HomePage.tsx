import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/Button.tsx";

export const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-6 gap-10">
      <motion.h3
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Your Project
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <Card className="rounded-2xl shadow p-2">
          <CardContent className="flex flex-col gap-4 p-6">
            <h2 className="text-xl font-semibold">Galleries</h2>
            <p className="text-base text-muted-foreground">
              Create and browse user galleries and uploaded media.
            </p>
            <Link to="/galleries" className="mt-auto">
              <Button className="w-full rounded-2xl">Go to Galleries</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow p-2">
          <CardContent className="flex flex-col gap-4 p-6">
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-base text-muted-foreground">
              View and edit your profile information.
            </p>
            <Link to="/profile" className="mt-auto">
              <Button className="w-full rounded-2xl">Go to Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
