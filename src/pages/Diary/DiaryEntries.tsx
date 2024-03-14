import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { DatePickerWithPresets } from './datepick';

import entries from './sampleEntries.json';

// entries.push({
//   "entry": "Finished 2nd 181 midterm!!!",
//   "timestamp": "2024-02-29T18:25:43.511Z" 
// });

function DiaryEntries() {
  const [editedEntries, setEditedEntries] = useState(entries.map(entry => entry.entry));
  const [isEditing, setIsEditing] = useState(Array(entries.length).fill(false));

  const handleEntryChange = (index, newValue) => {
    setEditedEntries(prevEntries => {
      const newEntries = [...prevEntries];
      newEntries[index] = newValue;
      return newEntries;
    });
  };

  const handleSave = (index) => {
    entries[index].entry = editedEntries[index];
    setEditedEntries(entries.map(entry => entry.entry));
    setIsEditing(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const handleEditClick = (index) => {
    setIsEditing(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="flex justify-center">
      <Carousel className="w-full max-w-screen-lg">
        <CarouselContent>
          {entries.map((entry, index) => (
            <CarouselItem key={entry.timestamp}>
              <div className="p-1">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex justify-center p-6"><DatePickerWithPresets givenDate={new Date(entry.timestamp)}/></CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center p-6">
                    <span>{entry.entry}</span>
                    {isEditing[index] && (
                      <textarea
                        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                        value={editedEntries[index]}
                        onChange={(e) => handleEntryChange(index, e.target.value)}
                      />
                    )}
                    <div className="mt-4">
                      {!isEditing[index] ? (
                        <button 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit Entry
                        </button>
                      ) : (
                        <button 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleSave(index)}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white"/>
        <CarouselNext className="bg-white"/>
      </Carousel>
    </div>
  );
}

export default DiaryEntries;

