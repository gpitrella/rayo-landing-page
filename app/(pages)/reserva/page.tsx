"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store/store"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import routeGuard from "@/app/guard/routeGuard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { MapPin, Car, Phone, Calendar, Clock, FileText, Search } from "lucide-react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useMap } from "react-leaflet"
import { useDispatch } from "react-redux"
import { fetchUser } from "@/app/store/user/userSlice"
import { createAppointmentEffect } from "@/app/store/appointment/appointmentActions"
import type { AppDispatch } from "@/app/store/store"
import { useRouter } from "next/navigation"
import StepIndicator from "@/components/stepIndicator"

// Tipo para la solicitud de cita
interface AppointmentRequest {
  user_id: string
  email: string
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
  createdAt: string
  status: "ACTIVE" | "PENDING" | "CANCELED"
}

// Componente para seleccionar ubicación en el mapa
function LocationMarker({ position, setPosition, setAddress, customIcon }: any) {
  const map = useMap()

  useMapEvents({
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

// Componente para controlar el mapa y la ubicación
function MapController({ position, setPosition, setAddress }: any) {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom())
    }
  }, [map, position])

  return null
}

function ReservarLavadoPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { user } = useSelector((state: RootState) => state.user)
  const { uid } = useSelector((state: RootState) => state.auth)

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
  const [userLoaded, setUserLoaded] = React.useState<boolean>(false) // Controla si el user está cargado
  const [permissionDenied, setPermissionDenied] = useState(false)
  const mapRef: React.MutableRefObject<L.Map | null> = useRef(null)
  // Añadir un nuevo estado para el precio después de la declaración de otros estados (cerca de la línea 130)
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    if (mapRef.current) {
      console.log("Mapa está listo:", mapRef.current)
    }
  }, [])

  useEffect(() => {
    if (!position) {
      setPosition(initialPosition)
    }
  }, [])

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

  // Modificar el useEffect que maneja el cambio de tipo de vehículo (añadir después del useEffect de carModels, cerca de la línea 170)
  useEffect(() => {
    // Actualizar el precio basado en el tipo de vehículo seleccionado
    if (tipoVehiculo === "hatchback") {
      setPrice(9900)
    } else if (tipoVehiculo === "sedan") {
      setPrice(12900)
    } else if (tipoVehiculo === "pickup") {
      setPrice(15900)
    } else {
      setPrice(null)
    }
  }, [tipoVehiculo])

  // Aquí debes llamarlo directamente en el cuerpo del componente

  // Estado para controlar si se ha solicitado permiso de ubicación
  const [locationRequested, setLocationRequested] = useState(false)

  // Inicializar la posición y solicitar geolocalización al cargar
  useEffect(() => {
    // Siempre inicializar con Buenos Aires
    setPosition(initialPosition)

    // Verificar si el usuario ya ha dado permiso previamente
    if ("geolocation" in navigator && !locationRequested) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            // Si ya tiene permiso, obtener ubicación automáticamente
            getUserLocation()
            setLocationRequested(true)
          }
        })
        .catch((err) => {
          console.log("Error verificando permisos:", err)
        })
    }
  }, [])

  // Función para obtener la ubicación del usuario
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          setPosition(newPosition)

          // Obtener dirección de la nueva posición
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition.lat}&lon=${newPosition.lng}`)
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
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionDenied(true)
            console.log("Permiso de ubicación denegado")
          } else {
            console.error("Error obteniendo ubicación:", error)
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    }
  }

  // Reemplaza la función requestLocationAccess con esta versión mejorada:
  const requestLocationAccess = () => {
    setLocationRequested(true)
    getUserLocation()
  }

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

  React.useEffect(() => {
    if (uid) {
      dispatch(fetchUser(uid)).then(() => setUserLoaded(true)) //
    }
    // }
  }, [dispatch, uid, user])

  // Función para guardar la cita

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!position) {
      toast.error("Por favor selecciona la ubicación de tu vehículo en el mapa!",{ duration: 4000})
      return
    }

    if (!modelo || !patente || !tipoVehiculo || !color || !phone || !date || !time || !terms) {
      toast.error("Por favor completa todos los campos requeridos",{ duration: 4000})
      return
    }

    try {
      setLoading(true)

      const appointmentData: AppointmentRequest = {
        user_id: uid,
        email: user.email,
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
        createdAt: new Date().toISOString(),
        status: "ACTIVE",
      }

      handleCreateAppointment(appointmentData)
    } catch (error) {
      console.error("Error al agendar lavado:", error)
      toast.error("Error al agendar un lavado!",{ duration: 4000})
    }
  }

  const handleCreateAppointment = async (appointmentData: AppointmentRequest) => {
    try {
      // Usar dispatch como se solicita
      await dispatch(createAppointmentEffect(appointmentData) as any)
      toast.success("Lavado agendado!",{ duration: 4000})
      router.push("/home")

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
      toast.error("Error al agendar un lavado!",{ duration: 4000})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[90%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl sm:px-0 top-5 mx-auto z-40 py-0 px-0 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Reservar Servicio de Lavado a Domicilio</h1>
      <h3 className='lg:text-base sm:text-base font-normal mb-8 text-center'>Seguí los siguientes pasos para agendar tu lavado.</h3>

      <StepIndicator />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mb-4">
            <Car className="h-5 w-5" />
            Reserva de Lavado de Auto
          </CardTitle>
          <Button
            onClick={requestLocationAccess}
            className="left-4 bg-black text-white px-4 py-2 rounded-md shadow-md w-min"
          >
            Usar mi ubicación
          </Button>
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
                {position && address.street && address.city && (
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
                  <MapContainer
                    center={position || initialPosition}
                    zoom={15}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    ref={mapRef}
                  >
                    <TileLayer url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    <LocationMarker
                      position={position}
                      setPosition={setPosition}
                      setAddress={setAddress}
                      customIcon={customIcon}
                    />
                    <MapController position={position} setPosition={setPosition} setAddress={setAddress} />
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Marca del Vehículo *</Label>
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
                      <div className="absolute z-10 w-full bg-white border rounded-md max-h-60 overflow-y-auto">
                        {filteredBrands.sort((a, b) => a.localeCompare(b)).map((brand) => (
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
                  <Label htmlFor="modelo">Modelo del Vehículo *</Label>
                  {carModels.length > 0 ? (
                    <Select value={modelo} onValueChange={setModelo}>
                      <SelectTrigger id="modelo">
                        <SelectValue placeholder="Seleccionar modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {carModels.sort((a, b) => a.localeCompare(b)).map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                        <SelectItem key='Other' value='other'>
                            Otro Modelo 
                        </SelectItem>
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
                  <Label htmlFor="patente">Patente del Vehículo *</Label>
                  <Input
                    id="patente"
                    placeholder="Ej: ABC123"
                    value={patente}
                    onChange={(e) => setPatente(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="tipo-vehiculo">Tipo de Vehículo *</Label>
                  <Select value={tipoVehiculo} onValueChange={setTipoVehiculo}>
                    <SelectTrigger id="tipo-vehiculo">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hatchback">Hatchback - Auto Chico</SelectItem>
                      <SelectItem value="sedan">Sedán - Auto Mediano</SelectItem>
                      <SelectItem value="pickup">Pickup - Camioneta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Color del vehículo *</Label>
                  <Input id="color" placeholder="Ej: Rojo" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Teléfono de Contacto *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Ej: +54 9 11 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Seleccionar que Día quiere el lavado *
                  </Label>
                  <Input className="w-full" id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Seleccionar a que Hora quiere el lavado *
                  </Label>
                  <Input className="w-full" id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
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
                  Acepto los términos y condiciones del servicio *
                </label>
              </div>
              {price !== null && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-center font-medium">
                    Precio del servicio: <span className="text-lg text-primary">${price.toLocaleString("es-AR")}</span>
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    Precio final basado en el tipo de vehículo seleccionado
                  </p>
                </div>
              )}
              <Button className="w-full mt-4" onClick={handleClick} disabled={loading}>
                {loading ? "Procesando..." : "Solicitar Servicio"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default routeGuard(ReservarLavadoPage)