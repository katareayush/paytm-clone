export function InputBox ({placeholder, label , onChange}){
    return <div className="pt-4">
        <div className="font-bold text-sm py-2">
        {label}
        </div>
      <input onChange ={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
    
}