export default function SectionHeader({ title }: { title: string }) {
   return (
      <h1 className="relative text-center text-2xl uppercase font-semibold">
         <span className="relative bg-white px-4 z-10">{title}</span>
         <span className="absolute w-1/2 left-1/2 -translate-x-1/2 h-[2px] bg-black/20 block top-1/2 -translate-y-1/2"></span>
      </h1>
   );
}
