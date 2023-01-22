import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      const newWeekDaysState = weekDays.filter(
        (weekDay) => weekDay !== weekDayIndex
      );
      setWeekDays(newWeekDaysState);
    } else {
      setWeekDays((prevState) => [weekDayIndex, ...prevState]);
    }
  }

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual seu comprometimento
      </label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        id="title"
        placeholder="Ex: Exercícios, Tomar água..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
      />

      <label className="font-semibold leading-tight mt-4" htmlFor="">
        Qual a recorrência
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((weekDay, i) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background focus:rounded-lg"
              checked={weekDays.includes(i)}
              onCheckedChange={() => handleToggleWeekDay(i)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3  font-semibold bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
      >
        <Check size={20} />
        Confirmar
      </button>
    </form>
  );
}
