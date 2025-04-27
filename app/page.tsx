import { TerminalLine } from "./components/TerminalInput";

export default function Home() {

  const preContent = [
    "Microsoft(R) MS-DOS(R) Version 6.22",
    "(C)Copyright Microsoft Corp 1981-1994.",
    " ",
    "C:\\>dir",
    " Volume in drive C is DOS_SITE",
    " Volume Serial Number is 1337-CAFE",
    " ",
    "Directory of C:\\",
    " ",
    "ABOUT    DIR        24 04-19-25  2:51p",
    " ",
    "    5 file(s)     248 bytes",
    "    0 dir(s)  1,048,576 bytes free",
    " If you want to switch to a directory (page) ",
    " You must follow this example and type : ",
    " ",
    "cd page",
    " ",
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      <div className="whitespace-pre-wrap">
        <div>
          {preContent.map((line, i) =>
          (
            <div key={i}>
              {line}
            </div>
          )
          )}
          <TerminalLine />
        </div>

      </div>

    </div>
  );
}
