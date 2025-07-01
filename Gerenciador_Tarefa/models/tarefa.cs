using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gerenciador.Models
{
    [Table("tarefa")]
    public class Tarefa
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [Column("Titulo")]
        public string Titulo { get; set; }

        [Required]
        [Column("Andamento")]
        public bool Andamento { get; set; }
    }
}