import React from 'react';
import { Star, Award, Quote, CheckCircle } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Ahsen Yılmaz",
      age: 29,
      job: "Yazılım Mühendisi",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      loss: "-15.5 kg",
      period: "3 Ayda",
      dietitian: "Dyt. Zeynep Kaya",
      comment: "Masa başı çalışırken sürekli tatlı krizleri yaşıyordum. Zeynep Hanım ile hazırladığımız kan tahlili odaklı diyet sayesinde hiç aç kalmadan 15 kilo verdim. En güzel kısmı diyet değişikliği taleplerime anında cevap verilmesiydi!",
      rating: 5
    },
    {
      id: 2,
      name: "Mert Demir",
      age: 34,
      job: "Finans Analisti",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      loss: "-9.0 kg Yağ Yakımı",
      period: "2 Ayda (+4kg Kas)",
      dietitian: "Dyt. Caner Aksoy",
      comment: "Sporcu beslenmesi konusunda Caner Bey tam bir uzman. Yağ kütlemi %24'ten %16'ya düşürürken kas hacmimi artırdık. Enerji seviyem hiç düşmedi.",
      rating: 5
    },
    {
      id: 3,
      name: "Selin Öztürk",
      age: 41,
      job: "Mimar",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      loss: "-18.2 kg",
      period: "4.5 Ayda",
      dietitian: "Dyt. Zeynep Kaya",
      comment: "Haşimato tiroidim olduğu için kilo veremeyeceğimi sanıyordum. Glütensiz özel protokol ile hayat kalitem yeniden yükseldi. Motivasyon mesajları da tam pes edeceğimi hissettiğim anlarda harika destek oldu!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Gerçek Dönüşüm Hikayeleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Danışanlarımızın <span className="gradient-text-emerald">İlham Veren Başarıları</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
            Sadece kilo vermekle kalmayıp, sürdürülebilir beslenme alışkanlığı kazanan danışanlarımızın deneyimleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-emerald-300"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        {item.name}
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">{item.job}, {item.age} Yaş</p>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-right">
                    <span className="text-xs font-black text-emerald-700 block">{item.loss}</span>
                    <span className="text-[9px] text-slate-500 font-medium">{item.period}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-emerald-200 absolute -top-2 -left-2 pointer-events-none" />
                  <p className="text-xs text-slate-700 leading-relaxed italic pl-3 font-medium">
                    "{item.comment}"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Diyetisyen:</span>
                <span className="font-extrabold text-emerald-700">{item.dietitian}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
