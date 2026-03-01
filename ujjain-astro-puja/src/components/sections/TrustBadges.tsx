 
import { trustBadges } from '../../data/trustBadges';
import Card from '../ui/Card';

export default function TrustBadges() {
  return (
    <section className="py-16 bg-dark-950 border-y border-dark-800">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustBadges.map((badge) => (
            <Card key={badge.id} className="text-center py-8">
              <div className="text-3xl mb-3">{badge.icon}</div>
              <h3 className="text-dark-50 font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-dark-300 text-xs">{badge.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
