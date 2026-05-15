"use server";
async function sumbitForm(data: FormData) {
  const name = data.get("name");
  const tel = data.get("tel");
  const kitchen = data.get("kitchen");

  if(!name || !tel ) {
    return
  }

  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  let message = "";

  if (kitchen) {
    message = `${name} a lasat un mesaj. Numarul:${tel}. Produsul dorit este: ${kitchen}`;
  } else {
    message = `${name} a lasat un mesaj. Numarul:${tel}`;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
  try {
    await fetch(url);
  } catch (error) {
    console.error(error);
  }
}

type CalculatorFormData = {
  shape: string;
  material: string;
  countertop: string;
  length: string;
  width: string;
  drawers: string;
  hasAppliances: boolean;
  style: string;
  phone: string;
  details: string;
};

async function submitCalculatorForm(data: CalculatorFormData) {
  if (!data.phone) {
    return;
  }

  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const message = [
    "Calculator de preturi - cerere noua",
    `Forma bucatariei: ${data.shape}`,
    `Material: ${data.material}`,
    `Blat: ${data.countertop}`,
    `Lungime: ${data.length} m`,
    `Latime: ${data.width} m`,
    `Numar de sertare: ${data.drawers}`,
    `Stil: ${data.style}`,
    `Tehnica incorporata: ${data.hasAppliances ? "Da" : "Nu"}`,
    `Numar de telefon: ${data.phone}`,
    `Detalii suplimentare: ${data.details || "Nu sunt completate"}`,
  ].join("\n");

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}

export { sumbitForm, submitCalculatorForm };
