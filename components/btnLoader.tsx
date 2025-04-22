import '@/app/styles/loader.css'
import { Button } from "@/components/ui/button";

function BtnLoader() {
  return (
    <Button className="button w-full font-bold group/arrow mt-5w-full"><span className="btn-loader"></span></Button> 
  )
}

export default BtnLoader