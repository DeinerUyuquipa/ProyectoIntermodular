import { GuitarConfigurator } from "@/components/lab/GuitarConfigurator";

export const metadata = {
  title: "Guitar Lab | REBO 3D",
  description: "Configura tu guitarra impresa en 3D en nuestro laboratorio interactivo.",
};

export default function LabPage() {
  return (
    <div className="flex-1 w-full overflow-hidden">
      <GuitarConfigurator />
    </div>
  );
}
