export default function ProductDesc({ desc }: { desc: { title: string; text: string }[] }) {
  return (
    <table className="w-full">
      <tbody className="text-left flex flex-col font-lato text-sm  rounded-2xl md:text-base">
        {desc.map((description, index) => {
          const { text, title } = description;
          const last = index === desc.length - 1;
          const first = index === 0;
          return (
            <tr key={`${description}_${index}`} className="grid grid-cols-2 first:rounded-tl-lg">
              <th
                className={`font-bold bg-primary-550 py-4 lg:py-6 pl-2 lg:pl-4 pr-4 border-b border-gray-500 ${
                  last && "rounded-bl-lg border-none"
                } ${first && "rounded-tl-lg"}`}
              >
                {title}
              </th>
              <td
                className={` bg-secondary-200 bg-opacity-40 py-4 lg:py-6 pl-2 lg:pl-4 pr-4 border-b  border-gray-500 ${
                  last && "rounded-br-lg border-none"
                } ${first && "rounded-tr-lg"}`}
              >
                {text}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
