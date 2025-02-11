import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRegister } from "@/hooks/react-query-hooks/useRegister";
import FactionSelect from "./FactionSelect";

const formSchema = z.object({
  symbol: z
    .string()
    .min(3, "Ship name must contain at least 3 characters")
    .max(14, "Ship name must contain at most 14 characters"),
  faction: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  factions: Faction[];
}

const ShipRegisterForm = ({ factions }: RegisterFormProps) => {
  const register = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      faction: "COSMIC",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await register.mutateAsync(data);
    } catch (error) {
      if (error instanceof Error) {
        setError("symbol", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input placeholder="Ship name" {...registerField("symbol")} />
        {errors.symbol && (
          <p className="text-sm text-red-500">{errors.symbol.message}</p>
        )}
      </div>

      <FactionSelect
        factions={factions}
        onValueChange={(value) => setValue("faction", value)}
        error={errors.faction?.message}
      />

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={register.isPending}
      >
        {register.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Registering...
          </>
        ) : (
          "Start Game"
        )}
      </Button>
    </form>
  );
};

export default ShipRegisterForm;
