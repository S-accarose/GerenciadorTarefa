using Microsoft.EntityFrameworkCore;

namespace Gerenciador_Tarefa.Models
{
    public class GerenciadorContext : DbContext
    {
        public GerenciadorContext(DbContextOptions<GerenciadorContext> options)
            : base(options)
        {
        }

        public DbSet<Tarefa> Tarefa { get; set; }
    }

    public class Tarefa
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public bool Andamento { get; set; }
    }
}