
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";

const Onboarding = () => {
  return (
    <AppLayout>
      <div className="yellow-gradient-soft min-h-screen -m-4 md:-m-6 p-4 md:p-6 flex flex-col items-center justify-center md:rounded-xl">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-md flex flex-col items-center text-center">
          <div className="mb-6">
            <img 
              src="/todo-illustration.svg" 
              alt="Organization illustration" 
              className="h-48 w-auto"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Get Organized Your Life</h1>
          
          <p className="text-muted-foreground mb-8">
            Truly is a simple and effective to-do list and task manager app which helps you manage time.
          </p>
          
          <Button className="bg-todo-green hover:bg-todo-green-dark text-white px-8 py-6 h-auto font-medium rounded-xl">
            Get Started
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Onboarding;
