/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addAppointment } from '../redux/reducer/appointmentSlice';
import DoctorDropdown from '../components/DoctorsDropDown';
import NewAppointmentMenu from '../components/NewAppointmentMenu';
import { doctorData } from '../redux/reducer/doctorSlice';

const NewAppointment = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  // const [location, setLocation] = useState('');
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    // user_id: '2',
    doctor_id: '',
    appointment_time: '',
    appointment_date: '',
    location: '',
    // Add more fields as needed
  });

  const allDoctorList = useSelector((state) => state.doctorsList.allDoctors);
  console.log(allDoctorList);
  const handleDoctorChange = (doctorIndex) => {
    setSelectedDoctorIndex(doctorIndex);
    // console.log(doctorIndex);
  };

  const doctor = allDoctorList.find((doctor) => doctor.id === selectedDoctorIndex);
  let doctorsLocation;
  if (doctor) {
    // access the property of doctors object
    const { location } = doctor;
    doctorsLocation = location;
  } else {
    doctorsLocation = null;
  }

  console.log(date, time, selectedDoctorIndex, doctorsLocation, 'update');

  useEffect(() => {
    dispatch(doctorData());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(addAppointment(formData));
    setFormData({
      // user_id: '2',
      doctor_id: selectedDoctorIndex,
      appointment_time: time,
      appointment_date: date,
      location: doctorsLocation,
      // doctor_id: selectedDoctorIndex,
      // appointment_time: time,
      // appointment_date: date,
      // location: 'nairobi',
    });
    // navigate('/appointments');
  };

  return (
    <div className="new-appointment-container">
      <NewAppointmentMenu />
      <h1 className="font-mono text-4xl font-black text-white pt-[12%] tracking-widest tracking-widest">BOOK APPOINTMENT</h1>
      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 text-white w-[50%] ml-[25%]" />
      <p className="text-white "> Welcome to our hospital&apos;s appointment booking page! Your health is our priority, and we are here to make scheduling your visit as easy as possible. Whether you need a routine check-up, a specialist consultation, or any medical service, we&apos;ve got you covered. Our dedicated team of healthcare professionals is ready to assist you. Choose a convenient date and time for your appointment, and we&apos;ll ensure you receive the best care. Please provide your contact information, insurance details, and a brief description of your medical concern. Your well-being is our mission, and we look forward to serving you. Book your appointment now and take the first step toward a healthier, happier you</p>

      <form onSubmit={handleSubmit} className="content-evenly flex flex-row w-[80vw] content-between space-x-1.5 mt-[8vh] ">
        <div className="ml-[15%]">
          <DoctorDropdown
            allDoctorList={allDoctorList}
            onChange={handleDoctorChange}
            selectedDoctorIndex={selectedDoctorIndex}
            id="name"
          />
          {allDoctorList
            .filter((doctor) => doctor.id === selectedDoctorIndex)
            .map((doctor) => (
              <div key={doctor.id}>
                <p className="w-[16.2vw] h-[6.8vh] rounded-3xl  border-gray-300 border-2 animate-pulse justify-center mt-[3vh] ml-[0] text-white font-black items-center border-gray-300 border-2">
                  Location:
                  {' '}

                  {' '}
                  {doctor.location ? doctor.location : 'Location'}
                </p>
              </div>
            ))}
        </div>
        <div className="pl-[5%] rounded-2xl">
          <input
            type="date"
            id="date"
            className="rounded-3xl py-[7px] px-[35px] border-gray-300 border-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="pl-[5%]">
          <input
            type="time"
            id="time"
            className="rounded-3xl py-[7px] px-[55px] px-[15px] border-gray-300 border-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="pl-[5%]">
          <button type="submit" onClick={handleSubmit} className="w-[15vw] h-[6.8vh] rounded-3xl  border-gray-300 border-2 animate-pulse justify-center  ">Book Now </button>

        </div>
      </form>
      <div className="w-[16.2vw] h-[6.8vh] rounded-3xl  border-gray-300 border-2 animate-pulse justify-center mt-[4vh] ml-[43%] text-white font-black items-center border-gray-300 border-2">{doctorsLocation || 'Location' }</div>
    </div>
  );
};

export default NewAppointment;
