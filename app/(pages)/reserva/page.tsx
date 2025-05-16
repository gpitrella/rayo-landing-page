"use client"

import * as React from "react"
import Table from "@/components/table"
import { getUpcomingAppointment } from "@/app/services/appointment.service"
import { useSelector } from "react-redux"
import { type RootState, useAppDispatch } from "@/app/store/store"
import routeGuard from "@/app/guard/routeGuard"
import { fetchUser } from "@/app/store/user/userSlice"
import { createAppointmentEffect } from "@/app/store/appointment/appointmentActions"
import { BsFillCalendarMinusFill } from "react-icons/bs"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Create a custom marker icon
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
})

// Component to handle map clicks and update marker position
function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : <Marker position={position} icon={customIcon} />
}

function Page() {
  interface AppointmentRequest {
    user_id: string
    modelo: string
    patente: string
    color: string
    phone: string
    place: string
    terms: boolean
    date: string
    time: string
    description: string
    location?: { lat: number; lng: number }
  }

  const { user } = useSelector((state: RootState) => state.user)
  const { error, isLoading } = useSelector((state: RootState) => state.appointments)
  const { uid } = useSelector((state: RootState) => state.auth)
  const [data, setData] = React.useState<any>([])
  const [fetchData, setFetchData] = React.useState<boolean>(false)
  const dispatch = useAppDispatch()

  // Form state
  const [formData, setFormData] = React.useState<Partial<AppointmentRequest>>({
    modelo: "",
    patente: "",
    color: "",
    phone: "",
    place: "",
    terms: false,
    date: "",
    time: "",
    description: "",
  })

  // Map state
  const [position, setPosition] = React.useState<{ lat: number; lng: number } | null>(
    { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile default position
  )
  const [date, setDate] = React.useState<Date>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, terms: checked })
  }

  const handleTimeChange = (value: string) => {
    setFormData({ ...formData, time: value })
  }

  const handleCreateAppointment = async () => {
    if (
      !formData.modelo ||
      !formData.patente ||
      !formData.color ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.terms ||
      !position
    ) {
      toast.error("Por favor complete todos los campos requeridos")
      return
    }

    try {
      const appointmentData: AppointmentRequest = {
        ...(formData as AppointmentRequest),
        user_id: uid,
        place: `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`,
        location: position,
      }

      await dispatch(createAppointmentEffect(appointmentData))
      toast.success("Lavado agendado!")
      setFetchData(true)

      // Reset form
      setFormData({
        modelo: "",
        patente: "",
        color: "",
        phone: "",
        place: "",
        terms: false,
        date: "",
        time: "",
        description: "",
      })
      setDate(undefined)
    } catch (error) {
      toast.error("Error al agendar un lavado!")
    }
  }

  React.useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      if (uid) {
        const res = await getUpcomingAppointment(uid)
        setData(res)
        setFetchData(false)
      }
    }

    if (uid) {
      fetchUpcomingAppointments()
    }
  }, [uid, fetchData])

  React.useEffect(() => {
    if (uid) {
      dispatch(fetchUser(uid))
    }
  }, [dispatch, uid])

  React.useEffect(() => {
    if (date) {
      setFormData({
        ...formData,
        date: format(date, "yyyy-MM-dd"),
      })
    }
  }, [date])

  return (
    <>
      <section className="w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl m-auto py-12 sm:py-16">
        <h1 className="text-2xl font-bold mb-8 text-center">Agendar Lavado de Auto</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card>
            <CardHeader>
              <CardTitle>Selecciona la ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full rounded-md overflow-hidden">
                <MapContainer
                  center={position || { lat: -33.4489, lng: -70.6693 }}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Haz clic en el mapa para seleccionar la ubicación de tu lavado
              </p>
              {position && (
                <div className="mt-2 text-sm">
                  Ubicación seleccionada: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Servicio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="modelo">Modelo</Label>
                    <Input
                      id="modelo"
                      name="modelo"
                      placeholder="Ej: Toyota Corolla"
                      value={formData.modelo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patente">Patente</Label>
                    <Input
                      id="patente"
                      name="patente"
                      placeholder="Ej: ABC123"
                      value={formData.patente}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      placeholder="Ej: Rojo"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Ej: +56 9 1234 5678"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Hora</Label>
                    <Select onValueChange={handleTimeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar hora" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Detalles adicionales sobre el servicio"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={formData.terms} onCheckedChange={handleCheckboxChange} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Acepto los términos y condiciones
                  </label>
                </div>

                <Button className="w-full" onClick={handleCreateAppointment} disabled={isLoading}>
                  {isLoading ? "Procesando..." : "Agendar Lavado"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl sm:px-0 top-5 mx-auto z-40 py-0 px-0 mt-12">
        <div className="container mx-auto px-0 w-full mt-[20px]">
          <div className="text-left lg:text-left">
            <div className="col-span-full xl:col-span-7">
              <h1 className="lg:text-2xl sm:text-lg font-medium mb-8 text-center">Lavados Reservados</h1>

              <div className="appt-container">
                {data?.length === 0 && (
                  <div className="w-full bg-[white] px-8 py-16 mt-4 flex flex-col justify-center items-center dark:bg-[black]">
                    <BsFillCalendarMinusFill className="text-[#858585] text-[4rem] " />
                    <p className="mt-3 sm:text-base md:text-xl text-[#858585] text-center leading-snug">
                      No cuentas con ningún lavado agendado
                    </p>
                  </div>
                )}
                {data?.length > 0 && <Table setFetchData={setFetchData} data={data} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default routeGuard(Page)
