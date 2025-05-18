"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import toast from "react-hot-toast"
import { MapPin, Car, Phone, Calendar, Clock, FileText, Search } from "lucide-react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useDispatch } from "react-redux"
import { createAppointmentEffect } from '@/app/store/appointment/appointmentActions'
// import { createAppointmentEffect } from "@/app/store/slices/appointmentSlice" // Asumiendo que existe este slice

// Tipo para la solicitud de cita
interface AppointmentRequest {
  user_id: string
  modelo: string
  patente: string
  tipo_vehiculo: string
  color: string
  phone: string
  location: {
    lat: number
    lng: number
    address: string
    street: string
    number: string
    city: string
  }
  terms: boolean
  date: string
  time: string
  description: string
  created_at: any
  status: string
}

// Componente para seleccionar ubicación en el mapa
function LocationMarker({ position, setPosition, setAddress, customIcon }: any) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())

      // Reverse geocoding para obtener la dirección
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
        .then((response) => response.json())
        .then((data) => {
          const address = data.display_name
          const street = data.address.road || ""
          const number = data.address.house_number || ""
          const city = data.address.city || data.address.town || data.address.village || ""

          setAddress({
            full: address,
            street,
            number,
            city,
          })
        })
        .catch((error) => console.error("Error obteniendo dirección:", error))
    },
  })

  return position === null ? null : <Marker position={position} icon={customIcon} />
}

export default function ReservarLavadoPage() {
  const dispatch = useDispatch()

  // Estados para el formulario
  const [position, setPosition] = useState<any>(null)
  const [address, setAddress] = useState<any>({
    full: "",
    street: "",
    number: "",
    city: "",
  })
  const [modelo, setModelo] = useState("")
  const [patente, setPatente] = useState("")
  const [tipoVehiculo, setTipoVehiculo] = useState("")
  const [color, setColor] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialPosition, setInitialPosition] = useState({ lat: -34.6037, lng: -58.3816 }) // Buenos Aires por defecto
  const [carBrands, setCarBrands] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState("")
  const [carModels, setCarModels] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [customIcon, setCustomIcon] = useState<any>(null)

  // Cargar marcas de vehículos al iniciar
  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
      .then((response) => response.json())
      .then((data) => {
        const brands = data.Results.map((make: any) => make.Make_Name)
        setCarBrands(brands)
      })
      .catch((error) => console.error("Error fetching car brands:", error))
  }, [])

  // Cargar modelos cuando se selecciona una marca
  useEffect(() => {
    if (selectedBrand) {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedBrand}?format=json`)
        .then((response) => response.json())
        .then((data) => {
          const models = data.Results.map((model: any) => model.Model_Name)
          setCarModels(models)
        })
        .catch((error) => console.error("Error fetching car models:", error))
    }
  }, [selectedBrand])

  // Solicitar ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setInitialPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Error obteniendo ubicación:", error)
          // Usar Buenos Aires como posición por defecto (ya está configurado)
        },
      )
    }
  }, [])

  // Configurar icono personalizado para el marcador
  useEffect(() => {
    setCustomIcon(
      L.icon({
        iconUrl: "/pin-car.svg",
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
      }),
    )
  }, [])

  // Filtrar marcas de vehículos según término de búsqueda
  const filteredBrands = carBrands
    .filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10) // Limitar a 10 resultados para no sobrecargar la UI

  // Función para guardar la cita
  const handleCreateAppointment = async () => {
    if (!position) {
      toast.error("Por favor selecciona la ubicación de tu vehículo en el mapa!")
      return
    }

    if (!modelo || !patente || !tipoVehiculo || !color || !phone || !date || !time || !terms) {
      toast.error("Por favor completa todos los campos requeridos")
      return
    }

    try {
      setLoading(true)

      const appointmentData: AppointmentRequest = {
        user_id: "user_id", 
        modelo,
        patente,
        tipo_vehiculo: tipoVehiculo,
        color,
        phone,
        location: {
          lat: position.lat,
          lng: position.lng,
          address: address.full,
          street: address.street,
          number: address.number,
          city: address.city,
        },
        terms,
        date,
        time,
        description,
        created_at: new Date().toISOString(),
        status: 'ACTIVE',
      }

      // Usar dispatch como se solicita
      // await dispatch(createAppointmentEffect(appointmentData)); 
      await dispatch(createAppointmentEffect(appointmentData) as any)
      toast.success("Lavado agendado!")

      // Resetear formulario
      setModelo("")
      setPatente("")
      setTipoVehiculo("")
      setColor("")
      setPhone("")
      setPosition(null)
      setAddress({ full: "", street: "", number: "", city: "" })
      setDate("")
      setTime("")
      setDescription("")
      setTerms(false)
      setSelectedBrand("")
    } catch (error) {
      console.error("Error al agendar lavado:", error)
      toast.error("Error al agendar un lavado!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl sm:px-0 top-5 mx-auto z-40 py-0 px-0 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Reservar Servicio de Lavado a Domicilio</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Reserva de Lavado de Auto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mapa */}
            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  Ubicación del Vehículo
                </Label>
                {position && (
                  <div className="bg-muted p-3 rounded-md mt-2 mb-2">
                    <p className="font-medium">Dirección seleccionada:</p>
                    <p>
                      {address.street} {address.number}, {address.city}
                    </p>
                    {/* <p className="text-xs text-muted-foreground mt-1">
                      Coordenadas: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                    </p> */}
                  </div>
                )}
                <div className="h-[420px] w-full rounded-md overflow-hidden border z-0">
                  {customIcon && (
                    <MapContainer
                      center={initialPosition}
                      zoom={15}
                      scrollWheelZoom={true}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                      <LocationMarker
                        position={position}
                        setPosition={setPosition}
                        setAddress={setAddress}
                        customIcon={customIcon}
                      />
                    </MapContainer>
                  )}
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Marca del Vehículo</Label>
                  <div className="relative">
                    <div className="flex items-center">
                      <Input
                        id="brand-search"
                        placeholder="Buscar marca..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-1"
                      />
                      <Search className="absolute right-3 h-4 w-4 text-muted-foreground" />
                    </div>
                    {searchTerm && (
                      <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredBrands.map((brand) => (
                          <div
                            key={brand}
                            className="px-3 py-2 hover:bg-muted cursor-pointer"
                            onClick={() => {
                              setSelectedBrand(brand)
                              setSearchTerm("")
                            }}
                          >
                            {brand}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedBrand && <div className="text-sm font-medium mt-1">Marca seleccionada: {selectedBrand}</div>}
                </div>

                <div>
                  <Label htmlFor="modelo">Modelo del Vehículo</Label>
                  {carModels.length > 0 ? (
                    <Select value={modelo} onValueChange={setModelo}>
                      <SelectTrigger id="modelo">
                        <SelectValue placeholder="Seleccionar modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {carModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="modelo"
                      placeholder="Ej: Corolla"
                      value={modelo}
                      onChange={(e) => setModelo(e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patente">Patente</Label>
                  <Input
                    id="patente"
                    placeholder="Ej: ABC123"
                    value={patente}
                    onChange={(e) => setPatente(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="tipo-vehiculo">Tipo de Vehículo</Label>
                  <Select value={tipoVehiculo} onValueChange={setTipoVehiculo}>
                    <SelectTrigger id="tipo-vehiculo">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedán</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="Ej: Rojo" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Teléfono de Contacto
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Ej: +54 9 11 1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Fecha
                  </Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Hora
                  </Label>
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Instrucciones Adicionales
                </Label>
                <Textarea
                  id="description"
                  placeholder="Instrucciones adicionales para el lavado..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="terms" className="text-sm font-medium leading-none">
                  Acepto los términos y condiciones del servicio
                </label>
              </div>

              <Button className="w-full mt-4" onClick={handleCreateAppointment} disabled={loading}>
                {loading ? "Procesando..." : "Solicitar Servicio"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

