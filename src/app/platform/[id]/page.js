import PlatformDetail from '../../../components/PlatformDetail'
import subscriptions from '../../../data/subscriptions'

// Poprawiona funkcja generateMetadata z await dla params
export const generateMetadata = async ({ params }) => {
  // Pobierz params jako obiekt Promise
  const resolvedParams = await params;
  
  // Teraz możesz bezpiecznie uzyskać dostęp do id
  const platformId = resolvedParams?.id;
  const subscription = subscriptions.find(sub => sub.id === platformId);
  
  if (subscription) {
    return {
      title: `${subscription.provider} - Szczegóły platformy | SubCompare`,
      description: `Poznaj szczegóły platformy ${subscription.provider}: plany, ceny, funkcje, promocje i opinie użytkowników.`,
    };
  }
  
  return {
    title: 'Szczegóły platformy | SubCompare',
    description: 'Szczegółowe informacje o platformie, jej planach, cenach, funkcjach i promocjach.',
  };
};

// Komponent serwerowy, który renderuje komponent kliencki
export default function PlatformPage({ params }) {
  return <PlatformDetail params={params} />
}