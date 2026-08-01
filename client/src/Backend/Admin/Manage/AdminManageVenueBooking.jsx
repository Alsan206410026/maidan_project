import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaEdit,
  FaEye,
} from "react-icons/fa";

function AdminManageVenueBooking() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [showEdit, setShowEdit] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [slots, setSlots] = useState([
    {
      id: 1,
      time: "6:00 AM - 7:00 AM",
      price: 1200,
      status: "Available",
      customer: "-"
    },
    {
      id: 2,
      time: "7:00 AM - 8:00 AM",
      price: 1200,
      status: "Booked",
      customer: "Ram Sharma"
    },
    {
      id: 3,
      time: "8:00 AM - 9:00 AM",
      price: 1200,
      status: "Unavailable",
      customer: "-"
    },
    {
      id: 4,
      time: "9:00 AM - 10:00 AM",
      price: 1200,
      status: "Available",
      customer: "-"
    },
    {
      id: 5,
      time: "10:00 AM - 11:00 AM",
      price: 1200,
      status: "Booked",
      customer: "Hari KC"
    },
    {
      id: 6,
      time: "11:00 AM - 12:00 PM",
      price: 1200,
      status: "Available",
      customer: "-"
    }
  ]);

  const bookings = [
    {
      id: 1,
      customer: "Ram Sharma",
      phone: "9841234567",
      date: "2026-08-01",
      time: "7:00 AM - 8:00 AM",
      amount: 1200,
      payment: "Paid",
      status: "Confirmed"
    },
    {
      id: 2,
      customer: "Hari KC",
      phone: "9812345678",
      date: "2026-08-01",
      time: "10:00 AM - 11:00 AM",
      amount: 1200,
      payment: "Pending",
      status: "Pending"
    },
    {
      id: 3,
      customer: "Suman Thapa",
      phone: "9800000000",
      date: "2026-08-01",
      time: "6:00 PM - 7:00 PM",
      amount: 1500,
      payment: "Paid",
      status: "Completed"
    }
  ];

  const stats = [
    {
      title: "Total Slots",
      value: slots.length,
      color: "bg-blue-500",
      icon: <FaClock />
    },
    {
      title: "Available",
      value: slots.filter(s => s.status === "Available").length,
      color: "bg-green-500",
      icon: <FaCheckCircle />
    },
    {
      title: "Booked",
      value: slots.filter(s => s.status === "Booked").length,
      color: "bg-orange-500",
      icon: <FaCalendarAlt />
    },
    {
      title: "Revenue",
      value: "Rs.18000",
      color: "bg-purple-500",
      icon: <FaMoneyBillWave />
    }
  ];

  const openEdit = slot => {
    setSelectedSlot({ ...slot });
    setShowEdit(true);
  };

  const saveSlot = () => {
    setSlots(
      slots.map(slot =>
        slot.id === selectedSlot.id ? selectedSlot : slot
      )
    );
    setShowEdit(false);
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Venue & Bookings
        </h1>
        <p className="text-gray-500">
          Manage slots and booking records.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item, i) => (

          <div key={i} className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            <div className={`${item.color} text-white text-2xl p-4 rounded-full`}>
              {item.icon}
            </div>

          </div>

        ))}

      </div>

      <div className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h2 className="text-xl font-semibold">
            Slot Management
          </h2>
          <p className="text-gray-500 text-sm">
            Select date to manage bookings.
          </p>
        </div>

        <input
          type="date"
          value={date}
          onChange={e=>setDate(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

      </div>

      <div className="bg-white rounded-xl shadow p-5">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-semibold">
            Slots
          </h2>

          <div className="flex gap-3">

            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Generate Today
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Generate Week
            </button>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {slots.map(slot=>(
                <tr key={slot.id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{slot.time}</td>

                  <td className="p-3">
                    Rs.{slot.price}
                  </td>

                  <td className="p-3">

                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${slot.status==="Available" && "bg-green-100 text-green-700"}
                    ${slot.status==="Booked" && "bg-blue-100 text-blue-700"}
                    ${slot.status==="Unavailable" && "bg-red-100 text-red-700"}
                    `}>
                      {slot.status}
                    </span>

                  </td>

                  <td className="p-3">
                    {slot.customer}
                  </td>

                  <td className="p-3 text-center">

                    {slot.status==="Booked" ? (

                      <button
                        onClick={()=>{
                          setSelectedSlot(slot);
                          setShowBooking(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
                      >
                        <FaEye/> View
                      </button>

                    ) : (

                      <button
                        onClick={()=>openEdit(slot)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
                      >
                        <FaEdit/> Edit
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
            {/* Recent Bookings */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Status</th>
              </tr>

            </thead>

            <tbody>

              {bookings.map((booking)=>(
                <tr key={booking.id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{booking.customer}</td>

                  <td className="p-3">{booking.phone}</td>

                  <td className="p-3">{booking.date}</td>

                  <td className="p-3">{booking.time}</td>

                  <td className="p-3">Rs.{booking.amount}</td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.payment==="Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {booking.payment}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      booking.status==="Confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : booking.status==="Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                    }`}>
                      {booking.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Edit Slot Modal */}

      {showEdit && selectedSlot && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

            <h2 className="text-2xl font-bold mb-5">
              Edit Slot
            </h2>

            <div className="space-y-4">

              <div>

                <label className="block mb-1">Time</label>

                <input
                  type="text"
                  value={selectedSlot.time}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100"
                />

              </div>

              <div>

                <label className="block mb-1">Price</label>

                <input
                  type="number"
                  value={selectedSlot.price}
                  onChange={(e)=>
                    setSelectedSlot({
                      ...selectedSlot,
                      price:e.target.value
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block mb-1">Status</label>

                <select
                  value={selectedSlot.status}
                  onChange={(e)=>
                    setSelectedSlot({
                      ...selectedSlot,
                      status:e.target.value
                    })
                  }
                  className="w-full border rounded-lg p-3"
                >
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>

              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={()=>setShowEdit(false)}
                className="px-5 py-2 rounded-lg bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={saveSlot}
                className="px-5 py-2 rounded-lg bg-green-600 text-white"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Booking Modal */}

      {showBooking && selectedSlot && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Booking Details
            </h2>

            <div className="grid grid-cols-2 gap-5">

              <div>
                <p className="text-gray-500 text-sm">Customer</p>
                <h3 className="font-semibold">{selectedSlot.customer}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <h3 className="font-semibold">98XXXXXXXX</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Date</p>
                <h3 className="font-semibold">{date}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Time</p>
                <h3 className="font-semibold">{selectedSlot.time}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Amount</p>
                <h3 className="font-semibold">
                  Rs.{selectedSlot.price}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Payment</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Paid
                </span>
              </div>

            </div>

            <div className="flex justify-end mt-8">

              <button
                onClick={()=>setShowBooking(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminManageVenueBooking;