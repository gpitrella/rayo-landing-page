import { deleteAppointment } from '../app/services/appointment.service';
import {  MdClear } from 'react-icons/md'
import toast from 'react-hot-toast';

const ConfirmDialogueBox: React.FC<any> = (props) => {

    const {closeDialogue} = props;
    const handleDeleteAppointment = async () =>{
        try {
            await deleteAppointment(props.id);
            toast.success('Successfully cancelled!',{ duration: 4000})
        } catch (error) {
            toast.error('Error cancelling appointment!',{ duration: 4000})
        }
    }
    
    return (
        <>
            <div className='absolute top-[20%] md:top-[40%] md:left-[40%] sm:top-[20%] sm:left-[4%] '>
                <div className='flex flex-col shadow-xl justify-center items-center w-[300px] sm:w-[300px] md:w-[350px] h-auto p-5 rounded-[6px] bg-[white] dark:bg-card'>
                    <div className='w-full flex justify-between items-center'>
                        <p className='md:text-[1.2rem] sm:text-base font-bold text-[#9b9b9b] '>Cancelar?</p>
                        <MdClear onClick={closeDialogue} className="md:text-[1.3rem] sm:text-[1.1rem] cursor-pointer" />
                    </div>
                    <p className='mt-2 md:text-base sm:text-sm '>¿Está seguro de que desea cancelar este lavado? ¡Las acciones realizadas son irreversibles!</p>
                    <div className='flex w-full gap-4 mt-3'>
                        <button onClick={()=> {
                            closeDialogue();
                            handleDeleteAppointment()
                        }} className='bg-[#e64646] hover:bg-[#f35656] transition-all ease-in-out w-full rounded-[6px] md:text-base sm:text-sm p-2 text-[white]'>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ConfirmDialogueBox;