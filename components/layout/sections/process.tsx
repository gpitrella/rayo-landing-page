import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
  name: string;
  url: string;
}
export const Process = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "https://res.cloudinary.com/djgghmpgh/image/upload/v1739960501/qt9mj2okggyt8lrmos3j.jpg",
      firstName: "Decidí el momento",
      lastName: "",
      positions: ["Definí en que momento realizar el lavado de tu vehículo"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/leopoldo-miranda/",
        },
        {
          name: "Github",
          url: "https://github.com/leoMirandaa",
        },
        {
          name: "X",
          url: "https://x.com/leo_mirand4",
        },
      ],
    },
    {
      imageUrl: "https://res.cloudinary.com/djgghmpgh/image/upload/v1739970846/qhrivdgrszwacnm41uzq.png",
      firstName: "Selecciona el lugar",
      lastName: "",
      positions: ["Busca en la app RAYO el lugar donde se encuentra tu vehículo para que realicemos el lavado"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/leopoldo-miranda/",
        },
        {
          name: "X",
          url: "https://x.com/leo_mirand4",
        },
      ],
    },
    {
      imageUrl: "https://res.cloudinary.com/djgghmpgh/image/upload/v1739961415/dgrgtyysmgsot4uqsayo.jpg",
      firstName: "Disfruta del lavado",
      lastName: "",
      positions: ["Segui con tus actividades mientras el washer realiza el lavado de tu vehículo"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/leopoldo-miranda/",
        },
        {
          name: "Github",
          url: "https://github.com/leoMirandaa",
        },
      ],
    }
  ];
  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
    }
  };

  return (
    <section id="process" className="w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl m-auto pt-26 pb-16 sm:mt-28 sm:pb-10">
      <div className="text-center mb-8">

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Servicios de RAYO      
        </h2>
        <h3 className="md:w-3/2 mx-auto text-xl text-center text-muted-foreground mb-8">
          Realiza el lavado de tu vehículo en tres simples pasos:
        </h3>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {teamList.map(
          (
            { imageUrl, firstName, lastName, positions, socialNetworks },
            index
          ) => (
            <Card
              key={index}
              className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
            >
              <CardHeader className="p-0 gap-0">
                <div className="h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                  />
                </div>
                <CardTitle className="py-6 pb-2 px-6 text-lg">
                  {firstName}
                  <span className="text-primary ml-2 text-lg">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, index) => (
                <CardContent
                  key={index}
                  className={`pb-0 text-muted-foreground ${
                    index === positions.length - 1 && "pb-6"
                  }`}
                >
                  {position}
                  {index < positions.length - 1 && <span>,</span>}
                </CardContent>
              ))}

              {/* <CardFooter className="space-x-4 mt-auto">
                {socialNetworks.map(({ name, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    className="hover:opacity-80 transition-all"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter> */}
            </Card>
          )
        )}
      </div>
    </section>
  );
};
