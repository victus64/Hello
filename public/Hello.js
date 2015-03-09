var counter;

function HelloWorld()
{
  if(!counter) counter=0;
  counter++;
  document.writeln("Привет, Мир из скрипта! "+counter);
}