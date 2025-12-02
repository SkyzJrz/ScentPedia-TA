// src/pages/NotesGuidePage.jsx

export default function NotesGuidePage() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)]">
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg p-5 md:p-6 text-slate-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="inline-flex px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/40 text-[11px] text-purple-200 mb-2">
                Notes Guide • Teori dasar parfum
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Notes Guide Parfum
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-xl">
                Sebelum membaca list parfum, ada baiknya paham dulu apa itu top, middle, 
                dan base notes. Halaman ini memberi penjelasan singkat dengan contoh 
                dan tips pemakaian, semua konten bersifat statis.
              </p>
            </div>
            <div className="text-xs text-slate-300 bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2 md:w-56">
              <p className="font-semibold text-slate-100">Fun fact 💡</p>
              <p className="mt-1">
                Satu parfum bisa mengandung puluhan bahan, tapi yang kita rasakan 
                biasanya diringkas menjadi tiga lapisan notes utama.
              </p>
            </div>
          </div>
        </section>

        {/* Top / Middle / Base cards */}
        <section className="grid md:grid-cols-3 gap-4 text-sm">
          <NoteCard
            title="Top Notes"
            color="emerald"
            badge="Kesan pertama"
            text="Wangi pertama yang langsung tercium sesaat setelah parfum disemprot. Biasanya ringan dan segar seperti citrus (lemon, bergamot), fruity, atau green notes."
            extra="Durasi sekitar 10–30 menit sebelum perlahan memudar dan berganti ke middle notes."
          />

          <NoteCard
            title="Middle / Heart Notes"
            color="sky"
            badge="Karakter utama"
            text="Aroma inti parfum yang muncul ketika top notes mulai hilang. Umumnya floral, spicy, atau aromatic (lavender, jasmine, rose)."
            extra="Bagian ini yang paling sering terasa oleh orang di sekitar kamu saat kamu memakai parfum."
          />

          <NoteCard
            title="Base Notes"
            color="amber"
            badge="Jejak terakhir"
            text="Lapisan terdalam yang muncul dan bertahan paling lama di kulit. Biasanya berupa woody, amber, musk, vanilla, atau kombinasi yang warm."
            extra="Memberikan kesan hangat, deep, dan bisa bertahan beberapa jam sampai seharian tergantung konsentrasi parfum."
          />
        </section>

        {/* Layer diagram / timeline */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg p-4 md:p-5 text-xs text-slate-100 space-y-4">
          <h3 className="text-sm font-semibold text-slate-50">
            Bagaimana Lapisan Notes Bekerja di Kulit?
          </h3>

          <div className="relative">
            <div className="hidden md:block h-1 w-full bg-slate-800 rounded-full mb-4" />
            <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
              <TimelineStep
                step="1"
                title="Semprotan awal"
                time="0 - 30 menit"
                color="emerald"
                text="Top notes langsung menyapa hidung: segar, ringan, cepat menguap. Jangan menilai parfum hanya dari fase ini."
              />
              <TimelineStep
                step="2"
                title="Fase jantung"
                time="30 - 90 menit"
                color="sky"
                text="Middle/heart notes muncul dan membentuk karakter utama parfum. Biasanya ini yang paling kamu rasakan saat beraktivitas."
              />
              <TimelineStep
                step="3"
                title="Drydown"
                time="> 90 menit"
                color="amber"
                text="Base notes mulai dominan: woody, musk, vanilla, amber. Fase ini yang memberi jejak wangi terakhir di kulit dan pakaian."
              />
            </div>
          </div>
        </section>

        {/* SPL Parfum section */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg p-4 md:p-5 text-xs text-slate-100 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-50">
                SPL Parfum – Sillage, Projection, Longevity
              </h3>
              <p className="text-[11px] text-slate-300 mt-1">
                Di komunitas parfum, istilah <span className="font-semibold">SPL</span> sering dipakai
                untuk menggambarkan seberapa jauh parfum tercium dan berapa lama bertahan di kulit.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[10px] px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200">
              SPL = Sillage • Projection • Longevity
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <SplCard
              label="Sillage"
              desc="Jejak wangi yang tertinggal saat kamu berjalan atau bergerak. Bukan hanya seberapa kuat bau di hidungmu, tetapi seberapa jauh orang lain mencium jejak wangi di belakangmu."
              levels={[
                'Soft: wangi hanya terasa dekat tubuh',
                'Moderate: meninggalkan jejak ringan saat lewat',
                'Heavy / Beast: jejak wangi menyebar kuat di ruangan',
              ]}
              color="emerald"
            />
            <SplCard
              label="Projection"
              desc="Seberapa jauh wangi parfum “menonjol” ke sekitar, biasanya dilihat dari jarak di mana orang lain mulai mencium wangi saat berdiri di dekatmu."
              levels={[
                'Skin scent: hanya tercium jika sangat dekat',
                'Arm-length: orang di radius 1 meter masih bisa cium',
                'Room-filling: bisa memenuhi satu ruangan kecil',
              ]}
              color="sky"
            />
            <SplCard
              label="Longevity"
              desc="Berapa lama parfum bertahan di kulit dari pertama kali disemprot sampai benar-benar hilang. Dipengaruhi konsentrasi parfum, jenis notes, dan kondisi kulit."
              levels={[
                'Short: 2–4 jam (umumnya parfum fresh-citrus)',
                'Moderate: 5–7 jam (banyak EDT/EDP harian)',
                'Long: 8+ jam (amber, vanilla, woody, oud)',
              ]}
              color="amber"
            />
          </div>

          <p className="text-[11px] text-slate-400">
            Catatan: SPL tinggi tidak selalu lebih baik. Untuk ke kampus atau ruangan tertutup,
            sillage & projection yang <span className="font-semibold">moderate</span> biasanya lebih aman
            agar tidak mengganggu orang lain.
          </p>
        </section>

        {/* Tips memilih parfum */}
        <section className="bg-gradient-to-br from-purple-600/30 via-slate-900 to-slate-950 border border-purple-500/40 rounded-2xl p-4 md:p-5 text-xs text-slate-100 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">Tips Singkat Memilih & Menggunakan Parfum</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <span className="font-semibold">Tes di kulit</span> – semprot di pergelangan tangan
                atau belakang telinga, bukan hanya di kertas tester.
              </li>
              <li>
                <span className="font-semibold">Tunggu waktu berkembang</span> – biarkan parfum
                berjalan minimal 15–30 menit untuk melihat perubahan dari top ke base notes.
              </li>
              <li>
                <span className="font-semibold">Sesuaikan dengan cuaca</span> – pilih yang fresh
                untuk cuaca panas, dan yang warm/sweet untuk malam atau ruangan ber-AC.
              </li>
            </ul>

            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <span className="font-semibold">Atur jumlah semprotan</span> – 2–4 semprotan
                biasanya cukup; terlalu banyak bisa bikin orang sekitar tidak nyaman.
              </li>
              <li>
                <span className="font-semibold">Pakai di titik nadi</span> – misalnya pergelangan,
                leher, belakang telinga; titik yang hangat membantu projeksi parfum.
              </li>
              <li>
                <span className="font-semibold">Pilih sesuai kepribadian</span> – bukan hanya tren.
                Wangi yang kamu suka biasanya membuatmu lebih percaya diri.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

function NoteCard({ title, color, badge, text, extra }) {
  const colorStyles = {
    emerald: {
      dot: 'bg-emerald-400',
      badgeBg: 'bg-emerald-500/12 text-emerald-200 border-emerald-500/40',
    },
    sky: {
      dot: 'bg-sky-400',
      badgeBg: 'bg-sky-500/12 text-sky-200 border-sky-500/40',
    },
    amber: {
      dot: 'bg-amber-400',
      badgeBg: 'bg-amber-500/12 text-amber-100 border-amber-500/40',
    },
  }[color] || {
    dot: 'bg-slate-400',
    badgeBg: 'bg-slate-500/12 text-slate-200 border-slate-500/40',
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-md p-4 flex flex-col gap-2 text-xs text-slate-100">
      <div className="flex items-center gap-2">
        <div className={`h-8 w-8 rounded-full ${colorStyles.dot} bg-opacity-80 flex items-center justify-center text-[11px] font-bold text-slate-900`}>
          {title.charAt(0)}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
          <span
            className={`inline-flex mt-1 px-2 py-[2px] rounded-full border text-[10px] ${colorStyles.badgeBg}`}
          >
            {badge}
          </span>
        </div>
      </div>
      <p className="text-slate-300 mt-2 leading-relaxed">{text}</p>
      <p className="text-slate-400">{extra}</p>
    </div>
  )
}

function TimelineStep({ step, title, time, color, text }) {
  const colorClasses = {
    emerald: 'bg-emerald-400 text-emerald-950',
    sky: 'bg-sky-400 text-sky-950',
    amber: 'bg-amber-400 text-amber-950',
  }[color] || 'bg-slate-400 text-slate-950'

  return (
    <div className="relative flex flex-col gap-1 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${colorClasses}`}
          >
            {step}
          </span>
          <p className="text-[12px] font-semibold text-slate-50">{title}</p>
        </div>
        <span className="text-[10px] text-slate-400">{time}</span>
      </div>
      <p className="text-[11px] text-slate-300 leading-relaxed">{text}</p>
    </div>
  )
}

function SplCard({ label, desc, levels, color }) {
  const colorStyles = {
    emerald: {
      dot: 'bg-emerald-400',
      badgeBg: 'bg-emerald-500/12 text-emerald-200 border-emerald-500/40',
    },
    sky: {
      dot: 'bg-sky-400',
      badgeBg: 'bg-sky-500/12 text-sky-200 border-sky-500/40',
    },
    amber: {
      dot: 'bg-amber-400',
      badgeBg: 'bg-amber-500/12 text-amber-100 border-amber-500/40',
    },
  }[color] || {
    dot: 'bg-slate-400',
    badgeBg: 'bg-slate-500/12 text-slate-200 border-slate-500/40',
  }

  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className={`h-7 w-7 rounded-full ${colorStyles.dot} bg-opacity-90 flex items-center justify-center text-[11px] font-bold text-slate-900`}>
          {label.charAt(0)}
        </div>
        <div>
          <p className="text-[12px] font-semibold text-slate-50">{label}</p>
          <span
            className={`inline-flex mt-1 px-2 py-[2px] rounded-full border text-[10px] ${colorStyles.badgeBg}`}
          >
            Parameter SPL
          </span>
        </div>
      </div>
      <p className="text-[11px] text-slate-300 leading-relaxed">{desc}</p>
      <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
        {levels.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  )
}
