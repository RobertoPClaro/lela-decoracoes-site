// Regras comerciais confirmadas pelo responsável pelo projeto em 14/10/2026.
// Este arquivo centraliza fatos para páginas, FAQs e dados estruturados.
const pickupPoint = {
  streetAddress: "R. Matusalém Gonçalves Pinheiro, 83",
  neighborhood: "Paranaguamirim",
  city: "Joinville",
  state: "SC",
  postalCode: "89231-603",
  country: "BR",
  display: "R. Matusalém Gonçalves Pinheiro, 83 - Paranaguamirim, Joinville - SC, 89231-603"
};

const ownerConfirmation = {
  type: "OWNER_CONFIRMATION",
  confirmedBy: "Responsável pelo projeto Lela Decorações",
  checkedAt: "2026-10-14",
  statement: "Moradores de todos os bairros de Joinville e Araquari podem contratar o Pegue e Monte com retirada e devolução no ponto do Paranaguamirim, em Joinville. Entrega depende da disponibilidade para a data e o endereço informados."
};

module.exports = {
  ownerConfirmation,
  pickupPoint,
  copy: {
    pickupEligibility: "Moradores de todos os bairros de Joinville e Araquari podem contratar o Pegue e Monte com retirada e devolução no Paranaguamirim, em Joinville.",
    pickupOption: "A retirada e a devolução são combinadas no ponto do Paranaguamirim, em Joinville.",
    deliveryConditions: "A entrega depende da disponibilidade da Lela para a data e o endereço informados. Consulte também eventuais taxas; a opção de retirada continua disponível.",
    themeAvailability: "A presença de um tema no catálogo não garante disponibilidade para uma data específica; a Lela confirma a composição e as condições antes da reserva."
  },
  services: {
    pegueEMonte: {
      slug: "pegue-e-monte",
      name: "Pegue e Monte",
      eligibleCities: ["joinville", "araquari"],
      residentEligibility: "CONFIRMED_ALL_NEIGHBORHOODS_WITH_PICKUP",
      pickup: {
        status: "CONFIRMED",
        location: pickupPoint,
        customerReturnsKit: true,
        scheduling: "Combine os detalhes de retirada e devolução diretamente com a Lela."
      },
      delivery: {
        status: "CONDITIONAL_ON_AVAILABILITY",
        dependsOn: ["date", "eventAddress", "ownerAvailability"],
        fee: "CONFIRM_WITH_OWNER",
        assemblyIncluded: "NOT_CONFIRMED"
      },
      themeAvailability: "CONFIRM_FOR_REQUESTED_DATE",
      assembly: "CUSTOMER_ASSEMBLES_AND_DISASSEMBLES"
    },
    miniFestaNaMesa: {
      slug: "mini-festa-na-mesa",
      name: "Mini Festa na Mesa",
      logistics: "CONFIRM_WITH_OWNER",
      pickup: "NOT_CONFIRMED_BY_THIS_POLICY",
      delivery: "NOT_CONFIRMED_BY_THIS_POLICY",
      assembly: "NOT_CONFIRMED_BY_THIS_POLICY"
    }
  }
};
