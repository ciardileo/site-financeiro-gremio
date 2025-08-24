// app/components/Footer.tsx

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {currentYear} Grêmio Estudantil do IFSP - São Miguel Paulista.
        </p>
        <p>
          Desenvolvido por <a href="https://www.github.com/ciardileo/site-financeiro-gremio" target="_blank" rel="author">Diretoria Financeira</a>. Duvidas ou sugestões: <a href="mailto:financeiroelzasoares@gmail.com">financeiroelzasoares@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}