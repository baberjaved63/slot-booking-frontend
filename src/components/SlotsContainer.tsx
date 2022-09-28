import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import DatePicker from "react-datepicker";
import { fetchSlots, createSlot } from "../modules/slots";
import ActionCable from "actioncable";
import Moment from 'moment';
import { Button } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";

const SlotsContainer = () => {
  const [state, setState] = useState({ date: new Date(), duration: 0 });
  const [slots, setSlots] = useState([]);
  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
  const dispatch = useAppDispatch();

  const createSubscription = () => {
    cable.subscriptions.create(
      { channel: "SlotsChannel" },
      {
        received: data => {
          setSlots(data.slots)
        },
        speak: function(data:any) {
          return this.perform("speak", data);
        }
      }
    );
  };

  useEffect(() => {
    createSubscription();
  }, []);

  const bookSlotMethod = (slot:any) => {
    let params = {
      slot: slot,
      date: state.date,
      duration: state.duration
    }
    createSlot(params)
      .then((data:any) => {
        setSlots(data.slots);
      })
  }

  const fetchSlotsMethod = () => {
    const params = state

    fetchSlots(params)
      .then((data) => {
        setSlots(data.slots);
      })
  }

  const formatDate = (date:string) => { return Moment.utc(date).format('DD-MM-YYYY HH:mm A'); }

  return (
    <div>
      <div className="taskContainer">
        <div className="col-md-10 w-auto">
          <strong>
            <label className="mb-1">Date: </label>
          </strong>
            <DatePicker
              className="form-control"
              selected={state.date}
              minDate={new Date()}
              onChange={(date:Date) => setState({ ...state, date })}
            />
        </div>
        <div>
          <strong>
            <label className="mb-1">Duration: </label>
          </strong>
          <input
            value={state.duration}
            name={"duration"}
            type={"number"}
            className="form-control"
            required
            onChange={(e) => {
              let duration = parseInt(e.target.value)
              setState({ ...state, duration })
            }}
          />
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            onClick={() => {
              fetchSlotsMethod();
              }
            }>
            Search
          </Button>
        </div>
      </div>
      <div>
        { slots.length !== 0 && 
          <div>
            <strong className="">Available Slots:</strong>
            {slots.map((slot, index) => {
              return (
                <div key={'_' + index} className="mb-1">
                  <span className="me-2">{formatDate(slot)}</span>
    
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => {
                      bookSlotMethod(slot);
                      }
                    }>
                    Book
                  </Button>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
}

export default SlotsContainer;
