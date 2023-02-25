using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication5.Models;

public partial class palazzoContext : DbContext
{
    public palazzoContext()
    {
    }

    public palazzoContext(DbContextOptions<palazzoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<lang> lang { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=141.94.17.42\\SQLEXPRESS;Initial Catalog=palazzo;Integrated Security=False;User ID=sa;Password=12345Aa!;MultipleActiveResultSets\n=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<lang>(entity =>
        {
            entity.HasKey(e => e.key).HasName("lang_pk");

            entity.ToTable("lang", "iso");

            entity.Property(e => e.key).HasMaxLength(1);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
